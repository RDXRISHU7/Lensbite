# Lens Bite | Professional Food Safety Platform

Lens Bite is a high-fidelity AI platform that cross-references food ingredients with your unique Health Profile.

## ⚡ How to Update Your Live Site Immediately

Every time we finish making changes in the editor, run these 3 commands in the terminal to update your live website:

1. `git add .`
2. `git commit -m "Update safety protocols"`
3. `git push origin main`

**Vercel/Firebase will detect the push and update your link automatically within 2 minutes.**

## 🛠️ Fixing the "Large File" Error (project.zip)
If your push ever fails because of a large file, run these commands in the terminal to "clean" your history:

1. `git reset $(git commit-tree HEAD^{tree} -m "Fresh start without large files")`
2. `git push -f origin main`

---
*Built with Next.js 15, Firebase, and Genkit AI.*
