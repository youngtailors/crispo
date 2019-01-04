import { PrimaryGeneratedColumn, Entity, Column, BeforeInsert } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import * as Bcryptjs from 'bcryptjs'

@ObjectType()
@Entity({
  name: 'users',
})
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', {})
  id: string

  @Field()
  @Column({ type: 'text', unique: true })
  email: string

  @Field()
  @Column({ type: 'text', unique: true })
  username: string

  @Column({ type: 'text' })
  password: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  name?: string

  @Field()
  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl?: string

  @Field()
  @Column({ type: 'text', nullable: true })
  bio?: string

  @Column({ type: 'int' })
  version: number

  @Field()
  access_token: string

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await Bcryptjs.hash(this.password, 10)
    this.version = 1
  }
}
