import { ApplicationException } from '../../src/errors/ApplicationException';
import { IExecutable } from '../../src/run/IExecutable';
import { Parameters } from '../../src/run/Parameters';

export class CommandExec implements IExecutable {
    public execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void {
        if (correlationId == "wrongId")
            throw new ApplicationException(null, null, null, "Test error");

        callback(null, 0);
    }
}
