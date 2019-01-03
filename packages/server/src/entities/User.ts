import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', {})
  id: string

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
}
