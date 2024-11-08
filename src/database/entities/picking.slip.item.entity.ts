import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PickingSlip } from './picking.slip.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DateTimeScalar } from 'src/utils/date-scalar';

// Set up for TypeORM and GraphQL integration
@ObjectType()
@Entity('picking_slip_items')
export class PickingSlipItem {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => PickingSlip, { nullable: true })
  @ManyToOne(() => PickingSlip, (pickingSlip) => pickingSlip.items)
  @JoinColumn({ name: 'picking_slip_id' })
  picking_slip: PickingSlip;

  @Field(() => Int)
  @Column('bigint', { nullable: true })
  item_id: number;

  @Field(() => Int)
  @Column('bigint', { nullable: true })
  stock_id: number;

  @Field(() => Int)
  @Column('bigint', { nullable: true })
  order_fulfillment_product_id: number;

  @Field(() => Int)
  @Column('int', { nullable: true })
  quantity: number;

  @Field(() => Int, { nullable: true })
  @Column('int')
  refunded_quantity: number;

  @Field(() => Int)
  @Column('bigint', { nullable: true })
  location_id: number;

  @Field(() => String)
  @Column('varchar', { length: 30, nullable: true })
  location_code: string;

  @Field(() => Boolean)
  @Column('tinyint', { nullable: true })
  is_pre_order: boolean;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { nullable: true })
  pre_order_shipping_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
