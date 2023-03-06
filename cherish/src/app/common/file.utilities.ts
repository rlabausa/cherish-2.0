import { JPG_HEX_SIGNATURE, PNG_HEX_SIGNATURE } from "./file-signature.constants";

export async function fileHasValidImageSignature(file: File) {
    return (
        await isPNG(file) ||
        await isJPG(file)
    );
}

export function readBuffer(file: File, start: number, end: number): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result as ArrayBuffer);
        }

        reader.onerror = reject;
        reader.readAsArrayBuffer(file.slice(start, end));
    });
}

export function readDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result as string);
        }

        reader.onerror = reject;
        reader.readAsDataURL(file);

    });

}

export function bytesMatch(headers: number[] | ReadonlyArray<number>, buffers: Uint8Array, options = { offset: 0 }) {
    return headers.every((header, index) => header === buffers[options.offset + index]);
}

export async function isPNG(file: File) {
    const buffer = await readBuffer(file, 0, PNG_HEX_SIGNATURE.length);
    const uint8array = new Uint8Array(buffer);

    return bytesMatch(PNG_HEX_SIGNATURE, uint8array);
}

export async function isJPG(file: File) {
    const buffer = await readBuffer(file, 0, JPG_HEX_SIGNATURE.length);
    const uint8array = new Uint8Array(buffer);

    return bytesMatch(JPG_HEX_SIGNATURE, uint8array);
}

export async function getDataUrlFromFile(file: File) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
}