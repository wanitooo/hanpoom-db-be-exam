import { Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import * as moment from 'moment';

// This scalar is set as a provider in app.module to have access to it throughout the app
@Scalar('DateTime')
export class DateTimeScalar {
  description = 'Custom DateTime scalar type';

  parseValue(value: number): Date {
    return new Date(value);
  }

  serialize(value: Date): string {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  }
}
