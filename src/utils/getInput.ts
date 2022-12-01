import { PathOrFileDescriptor, readFileSync } from 'fs';

export function getInput(path: PathOrFileDescriptor) {
    return readFileSync(path).toString().split('\n').filter(Boolean);
}

export function getRawInput(path: PathOrFileDescriptor) {
    return readFileSync(path).toString().split('\n');
}
