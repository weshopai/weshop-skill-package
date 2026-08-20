# Selfie source mapping

Treat source count as identity count, not as a request for panels.

## One source

- Bind source 1 as the only person's identity, age, face, hair, skin tone, and recognizable clothing cues.
- Reconstruct camera relationship as arm-length or mirror selfie according to the request.
- Return one natural photo, not a stylized rendering.

## Two sources

- Bind source 1 to person A and source 2 to person B. State left/right placement before generation.
- Preserve each identity independently; never average faces, swap hair, duplicate a person, or merge clothing.
- Use plausible proximity, scale, eye line, light direction, occlusion, and phone/lens perspective.
- Return exactly two people in one selfie image, not a diptych or collage.

## Acceptance

- phone or implied outstretched-arm geometry is plausible;
- close wide-angle perspective and slight edge distortion are natural, not extreme;
- gaze is toward the phone/lens or mirror as requested;
- casual crop may trim arms or shoulders but not accidentally cut facial features;
- everyday light and background remain coherent;
- identity A and identity B are separately recognizable;
- no beautification, illustration, filter, caption, UI chrome, watermark, panel, or extra person.

Multi-identity research informing this mapping:

- UMO multi-identity generation: https://github.com/bytedance/UMO
- Concat-ID multi-reference identity binding: https://github.com/ML-GSAI/Concat-ID
