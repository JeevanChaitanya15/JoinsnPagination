import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

// users and orders
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  product: text('product'),
});

//departments and employees
export const departments = pgTable('departments', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
});

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  deptId: integer('dept_id'),
});

//students, enrollments and courses
export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }),
});

export const enrollments = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').notNull(),
  courseId: integer('course_id').notNull(),
});

//self
export const info = pgTable('info',{
  id:serial('id').primaryKey(),
  empid:integer('empid'),
  names: varchar('names'),
  mngid:integer('mngid'),
})

//pagination
export const user1 = pgTable('user1', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: text('email'),
});
