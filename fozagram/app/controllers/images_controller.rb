class ImagesController < ApplicationController
    def index
        images = Image.all 
        render json: images, include: {
            likes: {
                except: [:created_at, :updated_at]
            }, 
            comments: {
                include: {
                    user: {
                        except: [:created_at, :updated_at]
                    }
                }
            },
            user: {
                except: [:created_at, :updated_at]
            }
            }, except: [:created_at, :updated_at]
    end

    # def update 
    #     byebug
    #     Image
    # end

    # code below is from blog post (modified by zed)

    def create
        @user = User.find_by(id: params[:user_id])
      
        @image = Image.new(image_params())
        respond_to_image
    end
      
    private def image_params
        params.require(:image).permit(:src, :alt, :user_id)
    end
      
    private def respond_to_image
        if @image.valid?

            @image.save 
           
            # image = Image.new(image: @image, user: @user)
            render json: @image, include: {
                likes: {
                    except: [:created_at, :updated_at]
                }, 
                comments: {
                    include: {
                        user: {
                            except: [:created_at, :updated_at]
                        }
                    }
                },
                user: {
                    except: [:created_at, :updated_at]
                }
                }, except: [:created_at, :updated_at]
        else
            render json: { errors: post.errors }, status: 400
        end
    end
end
