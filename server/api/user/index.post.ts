import { genSalt, hash } from "bcrypt";
import {
  db,
  UserSchema,
  UserSchemaInsert,
  UserSchemaSelect,
} from "~/server/db";
import { eq } from "drizzle-orm";

interface ICreateUser {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export default defineEventHandler(async (event) => {
  const body: ICreateUser = await readBody(event);

  const salt = await genSalt(10);

  const genPasswordHash = await hash(body.password, salt);

  const candidate = {
    username: body.username,
    passwordHash: genPasswordHash,
    isAdmin: body.isAdmin,
  };

  const findUser: UserSchemaSelect = (
    await db
      .select()
      .from(UserSchema)
      .where(eq(UserSchema.username, body.username))
      .limit(1)
      .execute()
  )[0];

  if (findUser) {
    return createError({
      statusCode: 401,
      message: "Пользователь существует",
    });
  }

  const user: UserSchemaInsert = await db
    .insert(UserSchema)
    .values({ ...candidate });

  const { passwordHash, ...result } = user;

  console.log(user);

  return result;
});
