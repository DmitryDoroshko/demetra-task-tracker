import type { Request } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

interface TypedRequestBody<T> extends Request<ParamsDictionary, any, T, ParsedQs> {
  body: T;
}

interface TypedRequestParams<T extends ParamsDictionary> extends Request<T, any, any, ParsedQs> {
  params: T;
}

interface TypedRequest<T, U extends ParamsDictionary> extends Request<U, any, T, ParsedQs> {
  body: T;
  params: U;
}

export type { TypedRequestBody, TypedRequest, TypedRequestParams };