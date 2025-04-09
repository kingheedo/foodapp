import { MarkerColor } from 'src/post/marker-color.enum';
import { Post } from 'src/post/post.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loginType: 'email' | 'kakao';

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  nickname?: string;

  @Column({
    nullable: true,
  })
  imageUri?: string;

  @Column({
    nullable: true,
  })
  kakaoImageUri?: string;

  @Column({
    nullable: true,
  })
  [MarkerColor.RED]?: string;

  @Column({
    nullable: true,
  })
  [MarkerColor.BLUE]?: string;

  @Column({
    nullable: true,
  })
  [MarkerColor.YELLOW]?: string;

  @Column({
    nullable: true,
  })
  [MarkerColor.GREEN]?: string;

  @Column({
    nullable: true,
  })
  [MarkerColor.PURPLE]?: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
