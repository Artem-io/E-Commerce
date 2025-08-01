package org.example.ecombackend.S3;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class S3Service
{
    @Value("${aws.bucketName}")
    private String bucketName;
    private final S3Client s3Client;

    public void uploadObject(String key, byte[] file)
    {
        if(file==null || file.length==0 || key==null || key.trim().isEmpty())
            throw new IllegalArgumentException("Invalid file or filename");

        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName).key(key)
                .acl(ObjectCannedACL.PUBLIC_READ)
                .build();

        s3Client.putObject(objectRequest, RequestBody.fromBytes(file));
    }

    public void deleteObject(String key) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder().bucket(bucketName).key(key).build();
        s3Client.deleteObject(deleteObjectRequest);
    }

    public String getFileUrl(String fileName) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, s3Client.serviceClientConfiguration().region().id(), fileName);
    }
}
