import { ConfigParams } from '../../src/config/ConfigParams';
import { MemcachedLock } from '../../src/lock/MemcachedLock';
import { LockFixture } from './LockFixture';

suite('MemcachedLock', ()=> {
    var _lock: MemcachedLock;
    var _fixture: LockFixture;

    setup((done) => {
        let host = process.env['MEMCACHED_HOST'] || 'localhost';
        let port = process.env['MEMCACHED_PORT'] || 11211;

        _lock = new MemcachedLock();

        let config = ConfigParams.fromTuples(
            'connection.host', host,
            'connection.port', port
        );
        _lock.configure(config);

        _fixture = new LockFixture(_lock);

        _lock.open(null, done);
    });

    teardown((done) => {
        _lock.close(null, done);
    });

    test('Try Acquire Lock', (done) => {
        _fixture.testTryAcquireLock(done);
    });

    test('Acquire Lock', (done) => {
        _fixture.testAcquireLock(done);
    });

    test('Release Lock', (done) => {
        _fixture.testReleaseLock(done);
    });

});
