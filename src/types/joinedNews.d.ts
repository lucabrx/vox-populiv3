import { BlogType } from "@/db/tables/Blog";
import { NewsType } from "@/db/tables/News";
import { UserType } from "@/db/tables/User"


type SafeNews = {
    User: UserType;
    News : NewsType
}

type SafeBlog = {
    User: UserType;
    Blog : BlogType
}
