import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type employeeDocument = employee & Document;

@Schema()
export class employee {
   
   @Prop()
   fname: string; 
   
   @Prop()
   lname: string; 
   
}

export const employeeSchema = SchemaFactory.createForClass(employee);