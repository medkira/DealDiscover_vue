import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";

export interface CreateMenuRepository {
  createMenu(menuData: CreateMenuRepository.Request): Promise<CreateMenuRepository.Response>;
}

export namespace CreateMenuRepository {
  export type Request = any;

  // export type Request = Omit<MenuProps, "id">;
  export type Response = Either<Failure, { menuId: string }>;
}
