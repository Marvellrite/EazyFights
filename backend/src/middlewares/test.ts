import { Injectable, NestMiddleware,  } from "@nestjs/common";
import { MiddlewareBuilder } from "@nestjs/core";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class TestMiddleware implements NestMiddleware {
    use(req: Request, res:Response, next:NextFunction){
        console.log("Middleware is been used");
        console.log(req.baseUrl);
        next();
    }
}

@Injectable()
export class TestMiddleware2 implements NestMiddleware {
    use(req: Request, res:Response, next:NextFunction){
        console.log("The 2nd Middleware is been used");
        console.log(req.baseUrl);
        next();
    }
}