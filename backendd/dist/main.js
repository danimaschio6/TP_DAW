"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    const configService = app.get(config_1.ConfigService);
    const globalPrefix = configService.get('prefix');
    app.setGlobalPrefix(globalPrefix);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    const swaggerHabilitado = configService.get('swaggerHabilitado');
    if (swaggerHabilitado) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Encuestas')
            .setDescription('Descripción de la API del sistema de encuestas')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup(globalPrefix, app, document);
    }
    const port = configService.get('port');
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map