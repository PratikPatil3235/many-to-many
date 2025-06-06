import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Course } from 'src/course/entities/course.entity';
import { CourseModule } from 'src/course/course.module';


@Module({
  imports: [TypeOrmModule.forFeature([Student,Course]),forwardRef(() => StudentModule)],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
