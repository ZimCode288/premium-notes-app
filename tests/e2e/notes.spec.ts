import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('should add a note', async ({ page }) => {
  const title = 'My First Note';
  const content = 'This is a test note content';
  
  await page.fill('#note-title', title);
  await page.fill('#note-content', content);
  await page.click('#add-note-btn');

  const noteTitle = page.locator('.note-card h3').first();
  await expect(noteTitle).toHaveText(title);
  
  const noteContent = page.locator('.note-card p').first();
  await expect(noteContent).toHaveText(content);
});

test('should delete a note', async ({ page }) => {
  // Add a note first
  await page.fill('#note-title', 'To be deleted');
  await page.fill('#note-content', 'Delete me');
  await page.click('#add-note-btn');

  const card = page.locator('.note-card', { hasText: 'To be deleted' });
  await expect(card).toBeVisible();
  
  await card.locator('.btn-delete').click();

  await expect(card).not.toBeVisible();
});

test('should check if add button is enabled', async ({ page }) => {
    const addBtn = page.locator('#add-note-btn');
    await expect(addBtn).toBeEnabled();
});

test('should check if footer link works', async ({ page }) => {
    const footerLink = page.locator('#footer-link');
    await expect(footerLink).toHaveAttribute('href', 'https://github.com');
});
