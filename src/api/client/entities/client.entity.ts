import { IsDefined, IsEmail, Length, Matches } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Client {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @IsDefined()
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @IsDefined()
    @Matches(/^(?=.*[0-9])[a-zA-Z0-9]{8,16}$/, {
      message: 'Invalid password format',
    })
    @Column()
    password: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;
}
