import instaloader

class InstagramProfile:
    def __init__(self):
        self.loader = instaloader.Instaloader()
    
    def set_username(self, username): 
        self.username = username
        self.profile = instaloader.Profile.from_username(self.loader.context, username)

    def get_profile_info(self) -> dict:
        return {
            "username": self.profile.username,
            "full_name": self.profile.full_name,
            "bio": self.profile.biography,
            "followers": self.profile.followers,
            "following": self.profile.followees,
            "posts": self.profile.mediacount,
            "private": self.profile.is_private,
            "verified": self.profile.is_verified,
            "external_url": self.profile.external_url,
            "profile_pic_url": self.profile.profile_pic_url
        }
    
    def get_posts(self, num_posts=6) -> list:
        posts = []
        for post in self.profile.get_posts():
            if len(posts) >= num_posts:
                break
            posts.append({                
                "likes": post.likes,                
                "caption": post.caption,
                "date": post.date
            })
        return posts
    
    def get_profile_instance(self):
        return self.profile
    def get_loader_instance(self):
        return self.loader