import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PickingSlipItem } from './picking.slip.item.entity';
import { PickingSlipDate } from './picking.slip.date.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DateTimeScalar } from 'src/utils/date-scalar';

// Set up for TypeORM and GraphQL integration
@ObjectType()
@Entity('picking_slips')
export class PickingSlip {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => Int)
  @Column('bigint')
  order_id: number;

  @Field(() => Int)
  @Column('bigint')
  order_fulfillment_order_id: number;

  @Field(() => Boolean)
  @Column('tinyint')
  is_contained_single_product: boolean;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Field(() => [PickingSlipItem], { nullable: true })
  @OneToMany(() => PickingSlipItem, (item) => item.picking_slip)
  items: PickingSlipItem[];

  @Field(() => PickingSlipDate, { nullable: true })
  @OneToOne(() => PickingSlipDate, (date) => date.picking_slip)
  date: PickingSlipDate;
}
