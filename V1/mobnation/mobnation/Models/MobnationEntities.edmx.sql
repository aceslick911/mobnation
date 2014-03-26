
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 03/25/2014 16:00:38
-- Generated from EDMX file: c:\Git\MobNation\V1\mobnation\mobnation\Models\MobnationEntities.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [mobnation];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_ProductProfile]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Products] DROP CONSTRAINT [FK_ProductProfile];
GO
IF OBJECT_ID(N'[dbo].[FK_ProfileReceipt]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Receipts] DROP CONSTRAINT [FK_ProfileReceipt];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductReceiptItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ReceiptItems] DROP CONSTRAINT [FK_ProductReceiptItem];
GO
IF OBJECT_ID(N'[dbo].[FK_ReceiptReceiptItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ReceiptItems] DROP CONSTRAINT [FK_ReceiptReceiptItem];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Profiles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Profiles];
GO
IF OBJECT_ID(N'[dbo].[Products]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Products];
GO
IF OBJECT_ID(N'[dbo].[Receipts]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Receipts];
GO
IF OBJECT_ID(N'[dbo].[ReceiptItems]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ReceiptItems];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Profiles'
CREATE TABLE [dbo].[Profiles] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ProfileName] nvarchar(max)  NOT NULL,
    [Email] nvarchar(max)  NOT NULL,
    [Password] nvarchar(max)  NOT NULL,
    [Data] nvarchar(max)  NOT NULL,
    [ProfileTitle] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Products'
CREATE TABLE [dbo].[Products] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ProductName] nvarchar(max)  NOT NULL,
    [Data] nvarchar(max)  NOT NULL,
    [ProductTitle] nvarchar(max)  NOT NULL,
    [Profile_Id] int  NULL
);
GO

-- Creating table 'Receipts'
CREATE TABLE [dbo].[Receipts] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [RecepientName] nvarchar(max)  NOT NULL,
    [RecepientEmail] nvarchar(max)  NOT NULL,
    [SignatureData] nvarchar(max)  NOT NULL,
    [Notes] nvarchar(max)  NOT NULL,
    [Profile_Id] int  NULL
);
GO

-- Creating table 'ReceiptItems'
CREATE TABLE [dbo].[ReceiptItems] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Quantity] nvarchar(max)  NOT NULL,
    [Product_Id] int  NOT NULL,
    [Receipt_Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Profiles'
ALTER TABLE [dbo].[Profiles]
ADD CONSTRAINT [PK_Profiles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [PK_Products]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Receipts'
ALTER TABLE [dbo].[Receipts]
ADD CONSTRAINT [PK_Receipts]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ReceiptItems'
ALTER TABLE [dbo].[ReceiptItems]
ADD CONSTRAINT [PK_ReceiptItems]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [Profile_Id] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [FK_ProductProfile]
    FOREIGN KEY ([Profile_Id])
    REFERENCES [dbo].[Profiles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductProfile'
CREATE INDEX [IX_FK_ProductProfile]
ON [dbo].[Products]
    ([Profile_Id]);
GO

-- Creating foreign key on [Profile_Id] in table 'Receipts'
ALTER TABLE [dbo].[Receipts]
ADD CONSTRAINT [FK_ProfileReceipt]
    FOREIGN KEY ([Profile_Id])
    REFERENCES [dbo].[Profiles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ProfileReceipt'
CREATE INDEX [IX_FK_ProfileReceipt]
ON [dbo].[Receipts]
    ([Profile_Id]);
GO

-- Creating foreign key on [Product_Id] in table 'ReceiptItems'
ALTER TABLE [dbo].[ReceiptItems]
ADD CONSTRAINT [FK_ProductReceiptItem]
    FOREIGN KEY ([Product_Id])
    REFERENCES [dbo].[Products]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductReceiptItem'
CREATE INDEX [IX_FK_ProductReceiptItem]
ON [dbo].[ReceiptItems]
    ([Product_Id]);
GO

-- Creating foreign key on [Receipt_Id] in table 'ReceiptItems'
ALTER TABLE [dbo].[ReceiptItems]
ADD CONSTRAINT [FK_ReceiptReceiptItem]
    FOREIGN KEY ([Receipt_Id])
    REFERENCES [dbo].[Receipts]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ReceiptReceiptItem'
CREATE INDEX [IX_FK_ReceiptReceiptItem]
ON [dbo].[ReceiptItems]
    ([Receipt_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------