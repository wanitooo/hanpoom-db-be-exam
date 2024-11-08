import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DateTimeScalar } from 'src/utils/date-scalar';

// This is just for the GraphQL query to satisfy Item II in the spec.
@ObjectType()
export class PreorderSlip {
  @Field(() => Int)
  id: number;

  @Field(() => DateTimeScalar, { nullable: true })
  created_at: string;

  @Field(() => String, { nullable: true })
  order_fulfillment_order_id: string;

  @Field(() => Int, { nullable: true })
  count_of_pre_order_items: number;

  @Field(() => String, { nullable: true })
  printed_username: string;

  @Field(() => String, { nullable: true })
  inspected_username: string;

  @Field(() => String, { nullable: true })
  packed_username: string;

  @Field(() => String, { nullable: true })
  shipped_username: string;

  @Field(() => String, { nullable: true })
  held_username: string;

  @Field(() => String, { nullable: true })
  cancelled_username: string;

  @Field(() => String, { nullable: true })
  refunded_username: string;

  @Field(() => String, { nullable: true })
  confirmed_username: string;

  @Field(() => DateTimeScalar, { nullable: true })
  printed_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  inspected_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  packed_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  shipped_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  delivered_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  returned_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  cancelled_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  refunded_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  held_at: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  confirmed_at: Date;

  @Field(() => String, { nullable: true })
  held_reason: string;
}
