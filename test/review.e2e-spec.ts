import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { v4 as uuidv4 } from 'uuid';

const productUuid = uuidv4();

const testDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание',
  rating: '5',
  productUuid,
};

describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  let createdUuid: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) - failed', async (done) => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(404);
    // .then(({ body }: request.Response) => {
    //   createdUuid = body.uuid;
    //   expect(createdUuid).toBeDefined();
    //   done();
    // });
  });

  it('/review/:uuid (DELETE) - failed', () => {
    return request(app.getHttpServer())
      .delete(`/review/${uuidv4()}`)
      .expect(404);
  });
});
