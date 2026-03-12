
UPDATE programs SET image_url = '/lovable-uploads/program-education-scholarships.png' WHERE id = '4e15bd88-6210-4ccf-af19-6ff7a5914060';
UPDATE programs SET image_url = '/lovable-uploads/program-health-sanitation-nutrition.png' WHERE id = '9fc66090-5f22-4d5a-b51b-87c7a14a991f';
UPDATE programs SET image_url = '/lovable-uploads/program-livelihood-entrepreneurship.png' WHERE id = '9f238e3b-f314-488a-8085-e56e8476d5c2';
UPDATE programs SET image_url = '/lovable-uploads/program-gender-equality-women.png' WHERE id = 'c3d98ff1-7ec9-47ca-923a-d98e1ee42c73';
UPDATE programs SET image_url = '/lovable-uploads/program-youth-leadership-mentorship.png' WHERE id = '77c9e963-9432-4a22-bc51-55589cc54e76';
UPDATE programs SET image_url = '/lovable-uploads/program-pan-african-culture.png' WHERE id = 'aa0c966b-d49f-4c12-9bb0-63a0bd149b85';

INSERT INTO programs (title, description, category, icon, image_url, display_order, active) VALUES
('UTU Yearly Conference', 'An annual Pan-African gathering bringing together youth leaders, activists, volunteers, and partners from across the continent. Features workshops, cultural showcases, leadership forums, and keynote sessions. Held in a different African country each year to promote regional equity and unity.', 'special-events', 'Calendar', '/lovable-uploads/program-utu-yearly-conference.png', 9, true),
('National Donation Day', 'A day of mass mobilization in every country we operate, where citizens, schools, influencers, and businesses unite to contribute resources or time toward community aid efforts. Together, we demonstrate the power of collective action.', 'special-events', 'Gift', '/lovable-uploads/program-national-donation-day.png', 10, true);
