import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { NormalUser, NormalUserProps } from "@/domain/entities/NormalUser";

export interface UpdateUserInformationByIdRespository {
    updateUser(
        params: UpdateUserInformationByIdRespository.Request
    ): Promise<UpdateUserInformationByIdRespository.Response>
}

export namespace UpdateUserInformationByIdRespository {
    export type Request = any;
    // export type Request =
    //     Omit<
    //         NormalUserProps,
    //         "id" | "userId" | "createdAt" | "updatedAt" | "password"
    //     >

    export type Response = Either<Failure, NormalUser>;
}