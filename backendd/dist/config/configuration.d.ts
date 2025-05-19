declare const _default: () => {
    port: number;
    prefix: string;
    swaggerHabilitado: boolean;
    database: {
        host: string;
        port: number;
        username: string | undefined;
        password: string | undefined;
        name: string | undefined;
        logging: boolean;
        logger: string | undefined;
    };
};
export default _default;
