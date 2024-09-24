import { db, UserSchema, UserSchemaSelect } from "~/server/db";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";

interface IAuthData {
  username: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const body: IAuthData = await readBody(event);

  const findUser: UserSchemaSelect = (
    await db
      .select()
      .from(UserSchema)
      .where(eq(UserSchema.username, body.username))
      .limit(1)
      .execute()
  )[0];

  if (!findUser) {
    return createError({
      statusCode: 401,
      message: "Имя пользователя или пароль введены не верно",
    });
  }

  const comparePasswords = await compare(body.password, findUser.passwordHash);

  if (!comparePasswords) {
    return createError({
      statusCode: 401,
      message: "Имя пользователя или пароль введены не верно",
    });
  }

  const { passwordHash, ...result } = findUser;

  const session = await setUserSession(event, {
    user: {
      ...result,
    },
    createdAt: Date.now(),
  });

  return session;
});
