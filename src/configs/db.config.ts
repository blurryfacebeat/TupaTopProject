import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDbConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    synchronize: true,
    entities: [`${__dirname}/../**/*.entity{.js, .ts}`],
  };
};
