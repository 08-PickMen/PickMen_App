package com.pickmen.backend.ocr;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.google.cloud.vision.v1.AnnotateImageRequest;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.EntityAnnotation;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.protobuf.ByteString;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Service
public class ocrService {

  public String detectText(MultipartFile uploadfile) throws IOException {
    List<AnnotateImageRequest> requests = new ArrayList<>();
    String check="";
    Double average=0.0;
    int count=1;


    ByteString imgBytes=null;

    
    try {
      
    imgBytes = ByteString.readFrom(uploadfile.getInputStream());
      
    } catch (Exception e) {
      e.printStackTrace();
    }


    Image img = Image.newBuilder().setContent(imgBytes).build();
    Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
    AnnotateImageRequest request =
        AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
    requests.add(request);

    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests. After completing all of your requests, call
    // the "close" method on the client to safely clean up any remaining background resources.
    try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
      BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
      List<AnnotateImageResponse> responses = response.getResponsesList();

      for (AnnotateImageResponse res : responses) {
        if (res.hasError()) {
          System.out.format("Error: %s%n", res.getError().getMessage());
          return "인증 실패";
        }
;
        // For full list of available annotations, see http://g.co/cloud/vision/docs
        for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
         //System.out.printf("text:%s",annotation.getDescription());
         if(annotation.getDescription().indexOf('.')==2 && annotation.getDescription().length()==4){
         try{
           Double stringToDouble=Double.valueOf(annotation.getDescription());
           if(55<=stringToDouble && stringToDouble <=100){
             average+=stringToDouble;
             count++;
             
        System.out.println(annotation.getDescription()+" "+count);
           }
         }
         catch(Exception e){
           continue;
         }
        }
        }
          
        }
        
      
      }

      if(count==1)
      return "인증 실패";
      else{
        count--;
        if(average/count>80)
        return Double.toString(average/count);
        else
        return "인증 실패";
      }
  }
}