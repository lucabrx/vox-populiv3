import { BlogType } from "@/db/tables/Blog";
import { NewsType } from "@/db/tables/News";
import { UserType } from "@/db/tables/User"
import { StoryType } from "@/db/tables/Story"

type SafeNews = {
    User: UserType;
    News : NewsType
}

type SafeBlog = {
    User: UserType;
    Blog : BlogType
}

type SafeStory = {
    User: UserType;
    Story : StoryType
}
