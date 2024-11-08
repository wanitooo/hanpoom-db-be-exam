import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { PickingSlip } from './picking.slip.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DateTimeScalar } from 'src/utils/date-scalar';

// Set up for TypeORM and GraphQL integration
@ObjectType()
@Entity('picking_slip_dates')
export class PickingSlipDate {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => PickingSlip, { nullable: true })
  @OneToOne(() => PickingSlip, (pickingSlip) => pickingSlip.date)
  @JoinColumn({ name: 'picking_slip_id' })
  picking_slip: PickingSlip;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 20, nullable: true })
  printed_username: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 20, nullable: true })
  inspected_username: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 20, nullable: true })
  packed_username: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 20, nullable: true })
  shipped_username: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 20, nullable: true })
  held_username: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 20, nullable: true })
  cancelled_username: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 20, nullable: true })
  refunded_username: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 20, nullable: true })
  confirmed_username: string;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  printed_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  inspected_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  packed_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  shipped_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  delivered_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  returned_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  cancelled_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  refunded_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  held_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  confirmed_at: Date;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 20, nullable: true })
  held_reason: string;
}
