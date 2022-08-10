/**
 * UploadFilesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  upload: async (req, res) => {
    try {
      const file = req.file('picture');
      const fileName = file.filename;
      const filePath = file.fd;
      const fileType = file.type;
      const fileSize = file.size;
      const fileExtension = file.extension();
      const fileMime = file.mime;
      const fileUploaded = await UploadFiles.create({
        fileName,
        filePath,
        fileType,
        fileSize,
        fileExtension,
        fileMime,
      });
      return res.status(200).send({
        success: true,
        message: 'File uploaded',
        data: fileUploaded,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

};

