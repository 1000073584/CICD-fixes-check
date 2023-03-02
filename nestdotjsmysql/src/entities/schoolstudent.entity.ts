import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Schoolstudent {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  fname: string;

  @Column()
  lname: string;

}
