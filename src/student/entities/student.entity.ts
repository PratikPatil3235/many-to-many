import { Course } from "src/course/entities/course.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student { 
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.students, { cascade: true })
  @JoinTable({name:'ownerId'}) 
  courses: Course[];
}
