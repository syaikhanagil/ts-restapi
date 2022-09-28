import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        MONGO_PASS: str(),
        PORT: port({ default: 4001 })
    })
}

export default validateEnv;
