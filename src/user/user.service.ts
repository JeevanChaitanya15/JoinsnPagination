import { Injectable,Inject } from '@nestjs/common';
import { db } from '../db';
import { users,orders,departments,employees,students,courses,enrollments,info,user1 } from '../db/schema';
import { eq,sql } from 'drizzle-orm';

@Injectable()
export class JoinService {
  async insertSampleData() {
    await db.insert(users).values([{ name: 'Alice' },{ name: 'Bob' },{ name: 'Charlie' },]);

    await db.insert(orders).values([
      { userId: 1, product: 'Laptop' },
      { userId: 2, product: 'Phone' },
      { userId: 1, product: 'Tablet' },
    ]);
    return 'Sample data inserted';
  }

  async innerJoin() {
    return await db.select({
        name: users.name,
        product: orders.product,
      }).from(users).innerJoin(orders, eq(users.id, orders.userId));
  }

  async leftJoin() {
    return await db.select({
        name: users.name,
        product: orders.product,
      }).from(users).leftJoin(orders, eq(users.id, orders.userId));
  }

  async rightJoin() {
    return await db.select({
        name: users.name,
        product: orders.product,
      }).from(orders).rightJoin(users, eq(users.id, orders.userId));
  }

  async fullOuterJoin() {
    return await db.select({ 
      name : users.name,
      product : orders.product
    }).from(users).fullJoin(orders, eq(users.id, orders.userId));
  }

  async crossJoin() {
    return await db.select({
      name : users.name,
      product : orders.product
    }).from(users).crossJoin(orders);
  }

  async selfJoin() {
    return await db.execute(
      sql.raw(`
        SELECT a.name AS user1, b.name AS user2
        FROM users a, users b
        WHERE a.id != b.id
      `)
    );
  }

  async naturalJoin() {
    return await db.execute(
      sql.raw(`
        SELECT user_id,product,name
        FROM users
        NATURAL JOIN orders;
      `)
    );
  }
}

@Injectable()
export class Join2Service {
  async insertSampleData() {
    await db.insert(departments).values([
      { name: 'HR' },
      { name: 'Engineering' },
      { name: 'Sales' },
    ]);

    await db.insert(employees).values([
      { name: 'Alice', deptId: 1 },
      { name: 'Bob', deptId: 2 },
      { name: 'Charlie', deptId: 1 },
    ]);

    return 'Sample data inserted';
  }

  async innerJoin() {
    return await db.select({
      employee: employees.name,
      department: departments.name,
    }).from(employees).innerJoin(departments, eq(employees.deptId, departments.id));
  }

  async leftJoin() {
    return await db.select({
      employee: employees.name,
      department: departments.name,
    }).from(employees).leftJoin(departments, eq(employees.deptId, departments.id));
  }

  async rightJoin() {
    return await db.select({
      employee: employees.name,
      department: departments.name,
    }).from(departments).rightJoin(employees, eq(employees.deptId, departments.id));
  }

  async fullOuterJoin() {
    return await db.select({
      employee: employees.name,
      department: departments.name,
    }).from(employees).fullJoin(departments, eq(employees.deptId, departments.id));
  }

  async crossJoin() {
    return await db.select({
      employee: employees.name,
      department: departments.name,
    }).from(employees).crossJoin(departments);
  }

  async selfJoin() {
    return await db.execute(sql.raw(`
      SELECT e1.name AS employee1, e2.name AS employee2
      FROM employees e1, employees e2
      WHERE e1.id != e2.id;
    `));
  }

  async naturalJoin() {
    // Works only if both tables have column named "dept_id"
    return await db.execute(sql.raw(`
      SELECT *
      FROM employees
      NATURAL JOIN departments;
    `));
  }
}

@Injectable()
export class Join3Service {
  async insertSampleData() {
    await db.insert(students).values([
      { name: 'Ravi' },
      { name: 'Sita' },
    ]);

    await db.insert(courses).values([
      { title: 'Math' },
      { title: 'Physics' },
    ]);

    await db.insert(enrollments).values([
      { studentId: 1, courseId: 1 },
      { studentId: 2, courseId: 2 },
    ]);

    return 'Data inserted';
  }

  async innerJoin() {
    return await db.select({
      student: students.name,
      course: courses.title,
    }).from(enrollments)
      .innerJoin(students, eq(students.id, enrollments.studentId))
      .innerJoin(courses, eq(courses.id, enrollments.courseId));
  }

  async leftJoin() {
    return await db.select({
      student: students.name,
      course: courses.title,
    }).from(students)
      .leftJoin(enrollments, eq(students.id, enrollments.studentId))
      .leftJoin(courses, eq(courses.id, enrollments.courseId));
  }

  async rightJoin() {
  return await db.select({
    student: students.name,
    course: courses.title,
  }).from(courses)
    .rightJoin(enrollments, eq(courses.id, enrollments.courseId))
    .rightJoin(students, eq(students.id, enrollments.studentId));
}


  async fullOuterJoin() {
    return await db.select({
      student: students.name,
      course: courses.title,
    }).from(students)
      .fullJoin(enrollments, eq(students.id, enrollments.studentId))
      .fullJoin(courses, eq(courses.id, enrollments.courseId));
  }

  async crossJoin() {
    return await db.select({
      student: students.name,
      course: courses.title,
    }).from(students).crossJoin(courses);
  }

  async selfJoin() {
    return await db.execute(sql.raw(`
      SELECT s1.name AS student1, s2.name AS student2
      FROM students s1, students s2
      WHERE s1.id != s2.id;
    `));
  }

  async naturalJoin() {
    // Simulate NATURAL JOIN: you must rename columns to be the same in both tables
    return await db.execute(sql.raw(`
      SELECT students.name, enrollments.student_id
      FROM students
      NATURAL JOIN enrollments;
    `));
  }
}

@Injectable()
export class User3Service {
  constructor(@Inject('DRIZZLE') private db: any) {}

   async createusers(y: {empid: number, names: string , mngid:number}) {
    return await db.insert(info).values(y);

  }

  async update(id: number, c:{empid: number, names: string , mngid:number} ) {
    return await db.update(info).set(c).where(eq(info.id, id));
  }

  async selfJoin() {
    const rows = await  this.db.execute(sql`
      SELECT 
      o.names AS emp,
      m.names AS mng
      FROM 
      info o
      JOIN 
      info m ON o.id = m.mngid;`)
    return rows;
  }
}

//Pagination
@Injectable()
export class UserService {
  constructor(
    @Inject('DRIZZLE') private readonly db: any,
  ) {}

  async createUser(data: { name: string; email: string }) {
    const result = await this.db.insert(user1).values(data).returning();
    return result[0];
  }

  async paginateUsers(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [{ count }] = await this.db.select({ count: sql<number>`count(*)` }).from(user1);

    const totalCount = Number(count);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await this.db.select().from(user1).limit(limit).offset(offset);

    return {
      totalCount,
      totalPages,
      currentPage: page,
      data,
    };
  }
}




