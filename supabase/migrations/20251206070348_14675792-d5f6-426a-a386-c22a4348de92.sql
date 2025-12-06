-- Create storage bucket for news images
INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true);

-- Allow public read access to news images
CREATE POLICY "Anyone can view news images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

-- Allow anyone to upload news images (admin via URL access)
CREATE POLICY "Anyone can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'news-images');

-- Allow anyone to update news images
CREATE POLICY "Anyone can update news images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'news-images');

-- Allow anyone to delete news images
CREATE POLICY "Anyone can delete news images"
ON storage.objects FOR DELETE
USING (bucket_id = 'news-images');