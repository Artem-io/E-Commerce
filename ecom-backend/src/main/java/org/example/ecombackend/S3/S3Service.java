package org.example.ecombackend.S3;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
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
    private final S3Presigner s3Presigner;


    public void uploadObject(String key, byte[] file)
    {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName).key(key).build();

        s3Client.putObject(objectRequest, RequestBody.fromBytes(file));
    }

    public void deleteObject(String key) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder().bucket(bucketName).key(key).build();
        s3Client.deleteObject(deleteObjectRequest);
    }

    public String getPresignedUrl(String keyName)
    {
        if(keyName==null || keyName.isEmpty()) return null;
        GetObjectRequest objectRequest = GetObjectRequest.builder().bucket(bucketName).key(keyName).build();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofHours(5L))
                .getObjectRequest(objectRequest).build();

        PresignedGetObjectRequest presignedRequest = s3Presigner.presignGetObject(presignRequest);
        return presignedRequest.url().toExternalForm();
    }
}
