import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prisma: PrismaService ,  configService: ConfigService,) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const email = emails[0].value;

    // Check if the patient already exists
    let patient = await this.prisma.patient.findUnique({ where: { email } });

    if (!patient) {
      // If patient doesn't exist, create a new one
      const { givenName, familyName } = name;
      patient = await this.prisma.patient.create({
        data: {
          username: `${givenName} ${familyName}`,
          role: 'PATIENT',
          email,
          phone: '',
          password: '',
        },
      });
    }

    const user = {
      provider: 'google',
      providerId: id,
      email: patient.email,
      username: patient.username,
      picture: photos[0].value,
    };
    
    done(null, user);
  }
}
