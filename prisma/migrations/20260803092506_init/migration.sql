-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'editor',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "valueEn" TEXT,
    "valueSi" TEXT,
    "valueTa" TEXT,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "slug" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleSi" TEXT,
    "titleTa" TEXT,
    "descriptionEn" TEXT NOT NULL,
    "descriptionSi" TEXT,
    "descriptionTa" TEXT,
    "image" TEXT,
    "contentEn" TEXT,
    "contentSi" TEXT,
    "contentTa" TEXT,
    "objectivesEn" TEXT,
    "objectivesSi" TEXT,
    "objectivesTa" TEXT,
    "outcomesEn" TEXT,
    "outcomesSi" TEXT,
    "outcomesTa" TEXT,
    "beneficiariesEn" TEXT,
    "beneficiariesSi" TEXT,
    "beneficiariesTa" TEXT,
    "location" TEXT,
    "image2" TEXT,
    "image3" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ongoing',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "slug" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleSi" TEXT,
    "titleTa" TEXT,
    "descriptionEn" TEXT NOT NULL,
    "descriptionSi" TEXT,
    "descriptionTa" TEXT,
    "icon" TEXT,
    "image" TEXT,
    "contentEn" TEXT,
    "contentSi" TEXT,
    "contentTa" TEXT,
    "featuresEn" TEXT,
    "featuresSi" TEXT,
    "featuresTa" TEXT,
    "benefitsEn" TEXT,
    "benefitsSi" TEXT,
    "benefitsTa" TEXT,
    "faqsEn" TEXT,
    "faqsSi" TEXT,
    "faqsTa" TEXT,
    "image2" TEXT,
    "image3" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleSi" TEXT,
    "titleTa" TEXT,
    "descriptionEn" TEXT,
    "descriptionSi" TEXT,
    "descriptionTa" TEXT,
    "category" TEXT NOT NULL DEFAULT 'research',
    "fileUrl" TEXT,
    "coverImage" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "slug" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleSi" TEXT,
    "titleTa" TEXT,
    "excerptEn" TEXT,
    "excerptSi" TEXT,
    "excerptTa" TEXT,
    "contentEn" TEXT NOT NULL,
    "contentSi" TEXT,
    "contentTa" TEXT,
    "image" TEXT,
    "highlightsEn" TEXT,
    "highlightsSi" TEXT,
    "highlightsTa" TEXT,
    "quoteEn" TEXT,
    "quoteSi" TEXT,
    "quoteTa" TEXT,
    "image2" TEXT,
    "image3" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "slug" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleSi" TEXT,
    "titleTa" TEXT,
    "descriptionEn" TEXT NOT NULL,
    "descriptionSi" TEXT,
    "descriptionTa" TEXT,
    "location" TEXT,
    "image" TEXT,
    "contentEn" TEXT,
    "contentSi" TEXT,
    "contentTa" TEXT,
    "highlightsEn" TEXT,
    "highlightsSi" TEXT,
    "highlightsTa" TEXT,
    "agendaEn" TEXT,
    "agendaSi" TEXT,
    "agendaTa" TEXT,
    "image2" TEXT,
    "image3" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" SERIAL NOT NULL,
    "captionEn" TEXT,
    "captionSi" TEXT,
    "captionTa" TEXT,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameSi" TEXT,
    "nameTa" TEXT,
    "descriptionEn" TEXT NOT NULL,
    "descriptionSi" TEXT,
    "descriptionTa" TEXT,
    "price" DECIMAL(10,2),
    "image" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" SERIAL NOT NULL,
    "quoteEn" TEXT NOT NULL,
    "quoteSi" TEXT,
    "quoteTa" TEXT,
    "authorEn" TEXT NOT NULL,
    "authorSi" TEXT,
    "authorTa" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "url" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" SERIAL NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelSi" TEXT,
    "labelTa" TEXT,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'LKR',
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "payherePaymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_key_key" ON "Setting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_orderId_key" ON "Donation"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");
