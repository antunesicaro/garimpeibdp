import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyer } from './buyer/buyer.entity';
import { Seller } from './seller/seller.entity';
import { Clothing } from './clothing/clothing.entity';
import { Store } from './store/store.entity';
import { Bid } from './bid/bid.entity';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StoreModule } from './store/store.module';
import { BidModule } from './bid/bid.module';
import { ClothingModule } from './clothing/clothing.module';
import { Image } from './image/image.entity';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Use DATABASE_URL if available (Railway), otherwise use individual variables (local)
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '7000'),
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'root',
            database: process.env.DB_DATABASE || 'garimpeidb',
          }),
      entities: [Buyer, Seller, Clothing, Bid, Store, Image],
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    BuyerModule,
    SellerModule,
    StoreModule,
    BidModule,
    ClothingModule,
    ImageModule,
    DashboardModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
