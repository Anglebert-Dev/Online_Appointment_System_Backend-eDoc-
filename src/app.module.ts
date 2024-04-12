import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuardService } from './jwt-auth-guard/jwt-auth-guard.service';

@Module({
  imports: [PrismaModule, RecipeModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuardService],
})
export class AppModule {}
