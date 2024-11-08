import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PickingSlipService } from './picking-slip.service';
import { PickingSlip } from 'src/database/entities/picking.slip.entity';
import { PreorderSlip } from 'src/database/entities/pre-order.slip.entity';
import { PickingSlipView } from '../database/entities/picking-slip-view';

@Resolver((of) => PickingSlip)
export class PickingSlipResolver {
  constructor(private readonly pickingSlipService: PickingSlipService) {}

  // Returns raw picking slips without any filters or aggregations, can also return corresponding relations
  @Query((returns) => [PickingSlip], { name: 'defaultPickingSlips' })
  async defaultGetPickingSlips(): Promise<PickingSlip[]> {
    return this.pickingSlipService.findAll();
  }

  // Returns the picking slips with pre-orders as filtered by the date in the parameter e.g "2023-08-10"
  @Query((returns) => [PreorderSlip], { name: 'preOrder' })
  async preOrderPickingSlips(
    @Args('date', { type: () => String }) date: String,
  ): Promise<PreorderSlip[]> {
    const res = await this.pickingSlipService.getPreOrderSlips(date);
    return res;
  }

  // Returns picking slips as described in the spec, with printed status and has pre-order
  @Query(() => [PickingSlipView], { name: 'pickingSlips' })
  async pickingSlips(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 3 }) pageSize: number,
    @Args('status', { type: () => String, defaultValue: 'printed' })
    status: string,
    // @Args('preorder', { type: () => Boolean, defaultValue: true })
    // preorder: boolean,
  ): Promise<PickingSlipView[]> {
    return this.pickingSlipService.getPickingSlipsWithStatus(
      page,
      pageSize,
      status,
      //   preorder,
    );
  }
}
