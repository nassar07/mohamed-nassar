# API Integration Guide

## Overview
This React portfolio is now connected to your .NET backend API running at `https://localhost:7135`.

## Environment Setup

1. **Create `.env` file** in the project root:
```env
VITE_API_URL=https://localhost:7135/api
```

2. **For production**, update the URL:
```env
VITE_API_URL=https://your-production-api.com/api
```

## CORS Configuration (Required)

Your .NET backend **MUST** be configured to allow requests from the React frontend.

### Add to your `Program.cs`:

```csharp
// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",  // Vite dev server
            "http://localhost:4173",  // Vite preview
            "https://your-production-domain.com" // Production URL
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

// Before app.UseAuthorization()
app.UseCors("AllowReactApp");
```

## API Endpoints Used

### Projects
- `GET /api/Project/All` - Get all projects
- `GET /api/Project/GetById/{id}` - Get project by ID
- `POST /api/Project/Add` - Create project (requires auth, FormData with Image)
- `PUT /api/Project/Update/{id}` - Update project (requires auth, FormData with Image)
- `DELETE /api/Project/Delete/{id}` - Delete project (requires auth)

### Skills
- `GET /api/Skill/All` - Get all skills
- `GET /api/Skill/GetById/{id}` - Get skill by ID
- `POST /api/Skill/Add` - Create skill (requires auth, FormData with IconFile)
- `PUT /api/Skill/Update/{id}` - Update skill (requires auth, FormData with IconFile)
- `DELETE /api/Skill/{id}` - Delete skill (requires auth)

### Categories
- `GET /api/Category/All` - Get all categories
- `GET /api/Category/GetById/{id}` - Get category by ID
- `POST /api/Category/Add` - Create category (requires auth, JSON)
- `PUT /api/Category/Update/{id}` - Update category (requires auth, JSON)
- `DELETE /api/Category/Delete/{id}` - Delete category (requires auth)

## Authentication

The admin dashboard uses simulated authentication with:
- **Username**: `admin`
- **Password**: `admin123`

The token is stored in `localStorage` as `auth_token` and sent with admin requests as:
```
Authorization: Bearer {token}
```

## Testing Locally

1. **Start your .NET backend**:
```bash
cd YourBackendProject
dotnet run
```

2. **Start the React frontend**:
```bash
npm run dev
```

3. **Visit**: `http://localhost:5173`

## HTTPS Certificate Issues

If you encounter SSL certificate errors in development:

### Option 1: Trust the development certificate
```bash
dotnet dev-certs https --trust
```

### Option 2: Use HTTP in development
Update `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Features Connected

✅ **Public Portfolio**
- Projects section loads from `/api/Project/All`
- Skills section loads from `/api/Skill/All`
- Client-side search and filtering

✅ **Admin Dashboard** (`/dashboard`)
- View all projects and skills
- Delete projects and skills
- Create/Edit forms (ready for implementation)
- Toast notifications for success/error

✅ **Error Handling**
- Network errors display user-friendly messages
- Loading states during API calls
- Console logging for debugging

## Next Steps

To complete full CRUD functionality, you'll need to add:
1. **Project Create/Edit Forms** with image upload
2. **Skill Create/Edit Forms** with icon upload
3. **Category Management** interface
4. **Real authentication** (replace mock auth with JWT from backend)

## Production Deployment

1. Build the React app:
```bash
npm run build
```

2. Update environment variable for production API
3. Deploy `dist` folder to hosting (Netlify, Vercel, etc.)
4. Ensure CORS is configured for production domain
5. Use HTTPS for both frontend and backend
