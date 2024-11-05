export default function Invariant(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    }
    return;
}