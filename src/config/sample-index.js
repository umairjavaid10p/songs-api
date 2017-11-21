import convict from 'convict';
import fs from 'fs';
import debug from 'debug';

const conf = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    ip: {
        doc: 'The ip address to bind.',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'IP_ADDRESS',
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 4000,
        env: 'PORT',
    },
    host: {
        doc: 'Host to bind in the email.',
        format: '*',
        default: 'http://localhost',
    },
    mysql: {
        host: {
            docs: 'Host for mysql',
            format: '*',
            default: 'localhost',
        },
        name: {
            docs: 'Db name',
            format: '*',
            default: 'name',
        },
        username: {
            docs: 'user name for db connection',
            format: '*',
            default: 'username',
        },
        password: {
            docs: 'password for db connection',
            format: '*',
            default: 'password',
        },
        replication: {
            read: [{
                host: 'localhost',
                username: 'username',
                password: 'password',
                name: 'DB_name',
            }],
        },
    },
    email: {
        host: {
            docs: 'Host for email',
            format: '*',
            default: 'host',
        },
        port: {
            doc: 'The port to bind for email.',
            format: 'port',
            default: 123,
        },
        user: {
            docs: 'User of host to send email',
            format: '*',
            default: 'email',
        },
        password: {
            docs: 'Password for host user',
            format: '*',
            default: 'password',
        },
    },
    token: {
        secret: {
            docs: 'Token secret',
            format: '*',
            default: 'Secret',
        },
    },
});
const d = debug('kickstarter:conf');
const env = conf.get('env');
try {
    const path = `${__dirname}/${env}.json`;

    d('trying to access %s', path);
    fs.accessSync(path, fs.F_OK);

    conf.loadFile(path);
} catch (error) {
    d('file doesn\'t exist, loading defaults');
}

conf.validate({ strict: true });

export default conf;
