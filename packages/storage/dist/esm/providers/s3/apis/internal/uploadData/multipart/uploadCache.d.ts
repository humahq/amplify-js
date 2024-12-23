import { KeyValueStorageInterface, StorageAccessLevel } from '@aws-amplify/core';
import { ResolvedS3Config } from '../../../../types/options';
import { Part } from '../../../../utils/client/s3data';
interface FindCachedUploadPartsOptions {
    cacheKey: string;
    s3Config: ResolvedS3Config;
    bucket: string;
    finalKey: string;
    resumableUploadsCache: KeyValueStorageInterface;
}
/**
 * Find the cached multipart upload id and get the parts that have been uploaded
 * with ListParts API. If the cached upload is expired(1 hour), return null.
 */
export declare const findCachedUploadParts: ({ resumableUploadsCache, cacheKey, s3Config, bucket, finalKey, }: FindCachedUploadPartsOptions) => Promise<{
    parts: Part[];
    uploadId: string;
    finalCrc32?: string;
} | null>;
interface FileMetadata {
    bucket: string;
    fileName: string;
    key: string;
    uploadId: string;
    finalCrc32?: string;
    lastTouched: number;
}
interface UploadsCacheKeyOptions {
    size: number;
    contentType?: string;
    bucket: string;
    accessLevel?: StorageAccessLevel;
    key: string;
    file?: File;
    optionsHash: string;
}
/**
 * Get the cache key of a multipart upload. Data source cached by different: size, content type, bucket, access level,
 * key. If the data source is a File instance, the upload is additionally indexed by file name and last modified time.
 * So the library always created a new multipart upload if the file is modified.
 */
export declare const getUploadsCacheKey: ({ file, size, contentType, bucket, accessLevel, key, optionsHash, }: UploadsCacheKeyOptions) => string;
export declare const cacheMultipartUpload: (resumableUploadsCache: KeyValueStorageInterface, cacheKey: string, fileMetadata: Omit<FileMetadata, 'lastTouched'>) => Promise<void>;
export declare const removeCachedUpload: (resumableUploadsCache: KeyValueStorageInterface, cacheKey: string) => Promise<void>;
export {};
