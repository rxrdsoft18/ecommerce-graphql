import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../../auth/interfaces/token-payload.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

const getCurrentUserByContext = (context: ExecutionContext): TokenPayload => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
